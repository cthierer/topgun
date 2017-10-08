
build:
	@node index.js

lint:
	@./node_modules/.bin/eslint --ext .js --cache src

optimize-images:
	./node_modules/.bin/imagemin src/assets/*.jpg --out-dir=src/assets
