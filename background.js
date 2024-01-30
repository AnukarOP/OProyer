chrome.storage.sync.get(['customPart'], function(result) {
  const userCustomPart = result.customPart || '';

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Modify the request here
      if (details.url.includes(userCustomPart)) {
        // Replace or remove the user's custom part
        const modifiedUrl = details.url.replace(userCustomPart, '');

        // Redirect the request with the modified URL
        const message = {
          action: 'bypassedSuccessfully',
          modifiedUrl: modifiedUrl
        };

        // Send a message to the popup
        chrome.runtime.sendMessage(message);

        return { redirectUrl: modifiedUrl };
      }

      // If no modification needed, continue with the original request
      return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
});
