
function addSpeedrunLink(link) {
    
    const button = document.createElement('a');
    button.href = link;
    button.target = '_blank';
    button.style.display = 'inline-block';
    button.style.width = '46px'; 
    button.style.height = '30px'; 
    button.style.backgroundColor = '#2B475E'; 
    button.style.border = '1px solid #2B475E';
    button.style.borderRadius = '3px';
    button.style.backgroundImage = 'url("https://avatars.githubusercontent.com/u/11006616?s=200&v=4")';
    button.style.backgroundSize = '20px 20px'; 
    button.style.backgroundPosition = 'center';
    button.style.backgroundRepeat = 'no-repeat';
    button.style.textDecoration = 'none';
    button.style.position = 'relative'; 
    button.style.top = '11px'; 
    button.style.left = '-2px'; 
    button.style.transition = 'background-color 0.3s'; 

    
    const tooltip = document.createElement('span');
    tooltip.textContent = 'View on Speedrun.com'; 
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%'; 
    tooltip.style.left = '50%'; 
    tooltip.style.transform = 'translateX(-50%)'; 
    tooltip.style.backgroundColor = '#333'; 
    tooltip.style.color = '#fff'; 
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '12px'; 
    tooltip.style.opacity = '0'; 
    tooltip.style.transition = 'opacity 0.3s'; 
    button.appendChild(tooltip);

    
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#1F3A4C'; 
        tooltip.style.opacity = '1'; 
    });

    
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#2B475E'; 
        tooltip.style.opacity = '0'; 
    });

    
    const otherSiteInfoElement = document.querySelector('.apphub_OtherSiteInfo');
    
    if (otherSiteInfoElement) {
        
        const communityHubButton = otherSiteInfoElement.querySelector('a.btn_medium[href*="steamcommunity.com"]');

        if (communityHubButton) {
            
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'inline-block'; 
            buttonContainer.style.marginTop = '0px'; 
            buttonContainer.appendChild(button);
    
            
            otherSiteInfoElement.insertBefore(buttonContainer, communityHubButton);
        } else {
            console.log('Community Centre" button not found.');
        }
    } else {
        console.log('The element to add the button was not found.');
    }
}


const url = window.location.href;
const match = url.match(/store\.steampowered\.com\/app\/(\d+)/);
  
if (match) {
    const appId = match[1];
    chrome.runtime.sendMessage({ action: 'fetchSpeedrunLink', appId: appId }, response => {
      if (response.link) {
        addSpeedrunLink(response.link);
      }
    });
}
