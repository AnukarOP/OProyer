document.addEventListener('DOMContentLoaded', function() {
  const customPartInput = document.getElementById('customPart');
  const saveButton = document.getElementById('saveButton');
  const successPopup = document.getElementById('successPopup');

  saveButton.addEventListener('click', function() {
    const customPart = customPartInput.value;
    chrome.storage.sync.set({ customPart: customPart }, function() {
      console.log('Custom part saved:', customPart);
    });
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === 'bypassedSuccessfully') {
      const modifiedUrl = message.modifiedUrl;
      successPopup.textContent = `Bypassed Successfully!\nModified URL: ${modifiedUrl}`;
      successPopup.style.display = 'block';

      // Hide the success message after 3 seconds
      setTimeout(function() {
        successPopup.style.display = 'none';
      }, 3000);
    }
  });
});
