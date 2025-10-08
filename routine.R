Sys.setenv(HUGO_BUILD_FUTURE="true")
blogdown::hugo_build(local=TRUE)
blogdown::hugo_cmd("build", "--buildFuture")

blogdown::serve_site()


blogdown::stop_server()
