#!/bin/bash

find . -maxdepth 1 -name \*.jpg -exec convert {} -resize 900x900 thumb/{} \;
