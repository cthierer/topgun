
build:
	@node index.js

lint:
	@./node_modules/.bin/eslint --ext .js --cache src

optimize-images:
	./node_modules/.bin/imagemin src/assets/*.jpg --out-dir=src/assets
	./node_modules/.bin/imagemin src/assets/banners/*.jpg --out-dir=src/assets/banners

analyze-bundle:
	@./node_modules/.bin/webpack --config webpack.production.js --json | ./node_modules/.bin/webpack-bundle-size-analyzer

buildgallery-engagement:
	@rm -rf dist/galleries/engagement
	@mkdir -p dist/galleries/engagement
	node ./buildGallery albums/engagement dist/galleries/engagement https://cdn.stage5clingan.com/galleries/engagement

buildgallery-index:
	@mkdir -p dist/galleries
	node ./buildGalleryIndex.js dist/galleries https://cdn.stage5clingan.com/galleries
