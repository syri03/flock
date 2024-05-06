
/**
* Template Name: NiceAdmin
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
var bellIcon = document.querySelector('.bi-bell');

// Add event listener to the bell icon
bellIcon.addEventListener('click', function() {
  // Get the dropdown menu
  var dropdownMenu = document.querySelector('.notifications');

  // Toggle the display of the dropdown menu
  if (dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  } else {
    dropdownMenu.style.display = 'block';
  }
});

// Get all tab buttons
var tabButtons = document.querySelectorAll('.nav-link[data-bs-toggle="tab"]');

// Add event listeners to each tab button
tabButtons.forEach(function(tabButton) {
  tabButton.addEventListener('click', function(event) {
    // Prevent the default behavior of the button
    event.preventDefault();

    // Remove the 'active' class from all tab buttons
    tabButtons.forEach(function(button) {
      button.classList.remove('active');
    });

    // Remove the 'active' class from all tab content
    var tabContents = document.querySelectorAll('.tab-pane');
    tabContents.forEach(function(tabContent) {
      tabContent.classList.remove('active', 'show');
    });

    // Add the 'active' class to the clicked tab button
    this.classList.add('active');

    // Get the target tab content ID from the href attribute
    var targetTabId = this.getAttribute('href').replace('#', '');

    // Show the target tab content
    var targetTabContent = document.getElementById(targetTabId);
    targetTabContent.classList.add('active', 'show');
  });
});

