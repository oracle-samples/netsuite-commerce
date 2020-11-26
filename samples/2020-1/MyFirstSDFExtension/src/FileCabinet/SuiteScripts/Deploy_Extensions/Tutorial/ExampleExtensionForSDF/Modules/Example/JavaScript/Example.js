define('Example', [], function () {
	'use strict';

	return {
		mountToApp: function mountToApp (container) {
			var LayoutComponent = container.getComponent('Layout');
			var UserProfileComponent = container.getComponent('UserProfile');
			var UserProfile;
			var messageShown = false;

			if (LayoutComponent && UserProfileComponent) {

				UserProfileComponent.getUserProfile().then(function (profileObject) {
					UserProfile = profileObject;
				});

				LayoutComponent.on('afterShowContent', function () {
					var termsConfirm = _.find(UserProfile.customfields, function (field) {
						return field.id == 'custentity_tsandcs'
					});
				
					if (!messageShown && UserProfile.isloggedin && !termsConfirm.value) {
						LayoutComponent.showMessage({
							message: 'You have not agreed to our terms and conditions. You will be required to do so before placing an order.',
							type: 'info',
							selector: 'Message.Placeholder'
						});

						messageShown = true;
					}
				});
			}
		}
	}
});