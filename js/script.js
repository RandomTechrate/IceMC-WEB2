window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    const playerCount = document.getElementById('player-count');
    const ipAddressElement = document.getElementById('ip-address');
    const ipAddress = ipAddressElement ? ipAddressElement.textContent : '';
    const copyIpButton = document.getElementById('copy-ip');

    if (statusText && playerCount && ipAddress) {
        const apiUrl = `https://api.mcstatus.io/v2/status/java/${ipAddress}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.online) {
                    statusText.textContent = 'Online';
                    statusText.classList.add('online');
                    playerCount.textContent = `${data.players.online}/${data.players.max}`;
                } else {
                    statusText.textContent = 'Offline';
                    statusText.classList.add('offline');
                    playerCount.textContent = '0/0';
                }
            })
            .catch(error => {
                console.error('Error fetching server status:', error);
                statusText.textContent = 'Error';
                statusText.classList.add('offline');
                playerCount.textContent = '--/--';
            });
    }

    if (copyIpButton) {
        copyIpButton.addEventListener('click', () => {
            navigator.clipboard.writeText(ipAddress).then(() => {
                const originalIcon = copyIpButton.innerHTML;
                copyIpButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyIpButton.innerHTML = originalIcon;
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy IP: ', err);
                alert('Failed to copy IP address.');
            });
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
