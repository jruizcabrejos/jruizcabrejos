Sys.setenv(HUGO_BUILD_FUTURE="true")
blogdown::hugo_build(local=TRUE)

blogdown::serve_site()


blogdown::stop_server()
