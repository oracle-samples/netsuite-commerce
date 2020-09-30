<div class="plpitemcolors-hover-container">
    {{#each itemColors}}
        <a class="plpitemcolors-hover-block" href="{{this.url}}">
            <img src="{{resizeImage this.image 'tinythumb'}}">
            <span>{{this.color}}</span>
        </a>
    {{/each}}
</div>