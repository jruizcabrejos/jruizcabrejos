/*
 * Cursor-chasing behavior adapted from oneko.js:
 * https://github.com/adryd325/oneko.js
 * Sprite sheet from crgimenes/neko:
 * https://github.com/crgimenes/neko
 * See /vendor/neko/ for source revisions and license notices.
 */
(() => {
  "use strict";

  const script = document.currentScript;
  const spriteUrl = script?.dataset.nekoSprite;
  const button = document.getElementById("neko-toggle");

  if (!button || !spriteUrl) {
    return;
  }

  const storageKey = "neko-enabled";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
  const frameSize = 32;
  const nekoSpeed = 10;
  const frameInterval = 100;

  const spriteSets = {
    idle: [[-3, -2]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  let requestedEnabled = readStoredPreference();
  let active = false;
  let nekoElement = null;
  let animationFrame = 0;
  let lastFrameTimestamp = 0;
  let nekoPosX = 32;
  let nekoPosY = 32;
  let pointerPosX = window.innerWidth / 2;
  let pointerPosY = window.innerHeight / 2;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  function readStoredPreference() {
    try {
      return window.sessionStorage.getItem(storageKey) === "true";
    } catch (_error) {
      return false;
    }
  }

  function storePreference(enabled) {
    try {
      if (enabled) {
        window.sessionStorage.setItem(storageKey, "true");
      } else {
        window.sessionStorage.removeItem(storageKey);
      }
    } catch (_error) {
      // The toggle still works when storage is unavailable.
    }
  }

  function isAvailable() {
    return finePointer.matches && !reducedMotion.matches;
  }

  function updateButton() {
    const motionBlocked = reducedMotion.matches;
    let label = active ? "Disable Neko" : "Enable Neko";

    if (motionBlocked) {
      label = "Neko is unavailable while reduced motion is enabled";
    }

    button.disabled = motionBlocked;
    button.setAttribute("aria-disabled", String(motionBlocked));
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", label);
    button.title = label;
    button.classList.toggle("is-active", active);
  }

  function clampPosition() {
    const minX = Math.min(frameSize / 2, window.innerWidth / 2);
    const minY = Math.min(frameSize / 2, window.innerHeight / 2);
    const maxX = Math.max(minX, window.innerWidth - frameSize / 2);
    const maxY = Math.max(minY, window.innerHeight - frameSize / 2);

    nekoPosX = Math.min(Math.max(minX, nekoPosX), maxX);
    nekoPosY = Math.min(Math.max(minY, nekoPosY), maxY);
  }

  function placeNeko() {
    if (!nekoElement) {
      return;
    }

    nekoElement.style.left = `${nekoPosX - frameSize / 2}px`;
    nekoElement.style.top = `${nekoPosY - frameSize / 2}px`;
  }

  function setSprite(name, frame) {
    if (!nekoElement) {
      return;
    }

    const frames = spriteSets[name];
    const sprite = frames[frame % frames.length];
    nekoElement.style.backgroundPosition = `${sprite[0] * frameSize}px ${sprite[1] * frameSize}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (idleTime > 10 && Math.floor(Math.random() * 100) === 0 && idleAnimation === null) {
      const animations = ["sleeping", "scratchSelf"];

      if (nekoPosX < frameSize) animations.push("scratchWallW");
      if (nekoPosY < frameSize) animations.push("scratchWallN");
      if (nekoPosX > window.innerWidth - frameSize) animations.push("scratchWallE");
      if (nekoPosY > window.innerHeight - frameSize) animations.push("scratchWallS");

      idleAnimation = animations[Math.floor(Math.random() * animations.length)];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) resetIdleAnimation();
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;
      default:
        setSprite("idle", 0);
        return;
    }

    idleAnimationFrame += 1;
  }

  function advanceNeko() {
    frameCount += 1;

    const diffX = nekoPosX - pointerPosX;
    const diffY = nekoPosY - pointerPosY;
    const distance = Math.hypot(diffX, diffY);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    resetIdleAnimation();

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7) - 1;
      return;
    }

    let direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";

    setSprite(direction, frameCount);
    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;
    clampPosition();
    placeNeko();
  }

  function scheduleAnimation() {
    if (active && !document.hidden && animationFrame === 0) {
      animationFrame = window.requestAnimationFrame(onAnimationFrame);
    }
  }

  function onAnimationFrame(timestamp) {
    animationFrame = 0;

    if (!active || document.hidden) {
      return;
    }

    if (lastFrameTimestamp === 0) {
      lastFrameTimestamp = timestamp;
    }

    if (timestamp - lastFrameTimestamp >= frameInterval) {
      lastFrameTimestamp = timestamp;
      advanceNeko();
    }

    scheduleAnimation();
  }

  function onPointerMove(event) {
    pointerPosX = event.clientX;
    pointerPosY = event.clientY;
  }

  function onResize() {
    clampPosition();
    placeNeko();
  }

  function onVisibilityChange() {
    if (document.hidden) {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      lastFrameTimestamp = 0;
      return;
    }

    scheduleAnimation();
  }

  function startNeko(initialPointer) {
    if (active || !isAvailable()) {
      updateButton();
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const activatedWithPointer = initialPointer && initialPointer.detail !== 0;
    pointerPosX = activatedWithPointer ? initialPointer.clientX : buttonRect.left + buttonRect.width / 2;
    pointerPosY = activatedWithPointer ? initialPointer.clientY : buttonRect.top + buttonRect.height / 2;
    nekoPosX = Math.min(32, window.innerWidth / 2);
    nekoPosY = Math.min(32, window.innerHeight / 2);
    frameCount = 0;
    idleTime = 0;
    resetIdleAnimation();

    nekoElement = document.createElement("div");
    nekoElement.id = "neko-cursor-cat";
    nekoElement.setAttribute("aria-hidden", "true");
    nekoElement.style.backgroundImage = `url(${JSON.stringify(spriteUrl)})`;
    setSprite("idle", 0);
    placeNeko();
    document.body.appendChild(nekoElement);

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    active = true;
    updateButton();
    scheduleAnimation();
  }

  function stopNeko() {
    if (animationFrame !== 0) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    document.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);

    nekoElement?.remove();
    nekoElement = null;
    active = false;
    lastFrameTimestamp = 0;
    updateButton();
  }

  function onToggle(event) {
    if (active) {
      requestedEnabled = false;
      storePreference(false);
      stopNeko();
      return;
    }

    requestedEnabled = true;
    storePreference(true);
    startNeko(event);
  }

  function onAvailabilityChange() {
    if (!isAvailable()) {
      stopNeko();
    } else if (requestedEnabled) {
      startNeko();
    } else {
      updateButton();
    }
  }

  function listenToMediaQuery(query, listener) {
    if (query.addEventListener) {
      query.addEventListener("change", listener);
    } else {
      query.addListener(listener);
    }
  }

  button.addEventListener("click", onToggle);
  listenToMediaQuery(reducedMotion, onAvailabilityChange);
  listenToMediaQuery(finePointer, onAvailabilityChange);

  updateButton();
  if (requestedEnabled) {
    startNeko();
  }
})();
