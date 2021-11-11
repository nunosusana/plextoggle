/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */


const { Atk, Gio, GObject, Shell, St } = imports.gi;
const GLib = imports.gi.GLib;

const GETTEXT_DOMAIN = 'gnome-shell-extension-plextoggle';
const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const IndicatorName = 'Plex Toggle';
const DisabledIcon = 'off';
const EnabledIcon = 'on';
const ExtensionPath = ExtensionUtils.getCurrentExtension().path;

const PlexToggle = GObject.registerClass(
class PlexToggle extends PanelMenu.Button {
    _init() {
        super._init(null, IndicatorName);

        this.accessible_role = Atk.Role.TOGGLE_BUTTON;

        this._icon = (new St.Icon({
            style_class: 'system-status-icon',
        }));
        this._icon.gicon = Gio.icon_new_for_string(`${ExtensionPath}/icons/${DisabledIcon}.svg`);

        this._state = false;
        this.stopPlexMediaServer();

        this.add_actor(this._icon);
        this.add_style_class_name('panel-status-button');
        this.connect('button-press-event', this.toggleState.bind(this));
        this.connect('touch-event', this.toggleState.bind(this));

        
    }

    toggleState() {
        
        this._state = !this._state;

        if (this._state) {
            if(this.startPlexMediaServer()){
                this._icon.gicon = Gio.icon_new_for_string(`${ExtensionPath}/icons/${EnabledIcon}.svg`);
                Main.notify(_('Plex Media Server Started'));
            }
        } else {
            if(this.stopPlexMediaServer()){
                this._icon.gicon = Gio.icon_new_for_string(`${ExtensionPath}/icons/${DisabledIcon}.svg`);
                Main.notify(_('Plex Media Server Stopped'));
            }
        }
    }

    startPlexMediaServer() {
        GLib.spawn_command_line_async(`sh -c "systemctl start plexmediaserver; exit;"`);
        return true;
    }

    stopPlexMediaServer() {
        GLib.spawn_command_line_async(`sh -c "systemctl stop plexmediaserver; exit;"`);
        return true;
    }

});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new PlexToggle();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
