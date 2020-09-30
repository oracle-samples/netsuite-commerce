<div class="sc-cct-imageviewer">	<div class="sc-cct-imageviewer-slider-container">
		<div class="sc-cct-imageviewer-image-slider">
			<ul data-sc-cct-imageviewer class="sc-cct-imageviewer-image-slider-list">
					<li>
						<div class="sc-cct-imageviewer-slide-main-container">
							{{#if hasImage}}
								<img src="{{resizeImage imageUrl 'main'}}" alt="{{imageAlt}}" />
							{{/if}}
							{{#if hasText}}
								<div class="sc-cct-imageviewer-slide-caption sc-cct-imageviewer-slide-caption-{{valign}}">
									{{#each texts}}
										<h2 class="sc-cct-imageviewer-slide-caption-title">{{this}}</h2>
									{{/each}}
								</div>
							{{/if}}
						</div>
					</li>
			</ul>
		</div>
	</div>
</div>
