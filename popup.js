document.getElementById('saveBtn').addEventListener('click', function () {
  // Get all tabs in the current window
  chrome.tabs.query({currentWindow: true}, function (tabs) {
    // Create a list of URLs from the tabs
    var urls = tabs.map(function (tab) {
      return tab.url;
    }).join('\n');

    // Create a blob from the URLs
    var blob = new Blob([urls], {type: 'text/plain'});

    // Generate a filename with the current date and timestamp
    var currentDate = new Date();
    var formattedDate = currentDate.toISOString().replace(/[:.]/g, '-');
    var filename = 'tab_urls_' + formattedDate + '.txt';

    // Create a download link
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the body and simulate a click to download the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
