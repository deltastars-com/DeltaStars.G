#!/bin/sh
exec node_modules/.bin/vite --host 0.0.0.0 --port "${PORT:-5173}"
