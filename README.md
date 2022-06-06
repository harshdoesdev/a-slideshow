# a-slideshow
A Web Component For Pure HTML Slideshows

## Usage
**app.js**
```javascript
import '/src/Slideshow.js'
```

**index.html**
```html
<a-slideshow width="100vw" height="100vh" slide="0">
    <a-slide>
        <div class="box">
            <h1>Hello World!</h1>
        </div>
    </a-slide>

    <a-slide>
        <div class="box">
            <h2>This is a Demo</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque inventore, adipisci debitis porro incidunt officiis, at, voluptate placeat magnam praesentium fugiat amet autem. Provident architecto eaque porro id modi unde eum autem pariatur, maxime exercitationem culpa aliquam. Laborum, placeat ducimus totam, at sequi numquam minima eum reprehenderit iusto voluptates unde?
            </p>
        </div>
    </a-slide>

    <a-slide>
        <div class="box">
            <p>This is an Image</p>
            <img src="https://picsum.photos/200/300" height="100%">
        </div>
    </a-slide>
</a-slideshow>
```
