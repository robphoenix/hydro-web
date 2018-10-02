package main

import (
  "log"
  "net/http"
)

func main() {
  fs := http.FileServer(http.Dir("../dist/hydro-poc"))
  http.Handle("/", fs)

  log.Println("Listening...")
  http.ListenAndServe(":4200", nil)
}
