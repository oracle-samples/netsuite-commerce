{{!
    © 2017 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}
<div class="product-details-image-gallery">
    {{#if showImages}}
        {{#if showImageSlider}}
            <ul class="bxslider" data-slider>
                {{#each images}}
                    {{#if is360}}
                        <li data-zoom class="product-details-image-gallery-container-360">
                            <img
                                src="{{url}}"
                                class="reel"
                                id="reelimage"
                                height="450px"
                                width="450px"
                                data-cursor="hand"
                                data-frames="{{frames}}"
                                data-footage="{{footage}}"
                                data-image="{{url}}"
                            >
                        </li>
                    {{else}}
                        <li data-zoom class="product-details-image-gallery-container">
                            <img
                                src="{{resizeImage url ../imageResizeId}}"
                                alt="{{altimagetext}}"
                                itemprop="image"
                                data-loader="false"
                            >
                        </li>
                    {{/if}}
                {{/each}}
            </ul>
        {{else}}
            {{#with firstImage}}
                <div class="product-details-image-gallery-detailed-image" data-zoom>
                    <img
                        class="center-block"
                        src="{{resizeImage url ../imageResizeId}}"
                        alt="{{altimagetext}}"
                        itemprop="image"
                        data-loader="false">
                </div>
            {{/with}}
        {{/if}}
    {{/if}}
    <div data-view="SocialSharing.Flyout.Hover"></div>
</div>
