# Plex Media Server Toggle
## About
This [Gnome](https://www.gnome.org/) Shell Extension enables the possibility to start and stop the Plex Media Server service with a toggle button. By default the server wilk always be stopped when logging in.

![Screenshot](https://raw.githubusercontent.com/nunosusana/plextoggle/main/screenshots/sc_off.png)

![Screenshot](https://raw.githubusercontent.com/nunosusana/plextoggle/main/screenshots/sc_on.png)

## Pre requesites
This extension only start and stop the [Plex Media Server](https://www.plex.tv/media-server-downloads/) which **MUST BE INSTALLED** first.

## Install
Download code from [GitHub](https://github.com/nunosusana/plextoggle) and copy the folder `plextoggle@nunosusana.com` to the folder `/home/$USER/.local/share/gnome-shell/extensions`.

## Using systemctl without password
Add the 
[10-service_status.rules](10-service_status.rules) file to the folder `/etc/polkit-1/rules.d`.

Change the `my-group` to any other group that suits your needs.

## Credits
Some parts have been re-used from other gnome extensions:  
[Services Systemd](https://github.com/petres/gnome-shell-extension-services-systemd)  
[Caffeine](https://github.com/eonpatapon/gnome-shell-extension-caffeine)  

## License
[GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html)
