
const MONSTER = this.MONSTER || {};

class MonsterImportInit {
  
  constructor() {}

  static init() {
    MonsterImportInit.hookReady();
    MonsterImportInit.hookRenderActorDirectory();
  }

  static hookRenderActorDirectory() {
    Hooks.on("renderActorDirectory", (app, html, data) => {

      const importButton = $('<button class="monster-import-btn"><i class="fas fa-pastafarianism"></i>Monster Import</button>');
      html.find(".directory-footer").append(importButton);

      importButton.click((ev) => {
        MONSTER.MonsterImport.testModal();
      });

    });
  }

  static hookReady() {
    Hooks.on('ready', () => {
      MONSTER.MonsterImport = new MonsterImport();

      game.settings.register("pf2e_monster_import", "files", {
        scope: "world",
        default: {},
        type: Object,
      });

      game.settings.register("pf2e_monster_import", "folderDir", {
        name: "Base Monster Directory",
        hint: "This is where you store your custom monster JSON files",
        type: window.Azzu.SettingsTypes.DirectoryPicker,
        default: "monsters",
        scope: "world",
        config: true
      });

    });
  }
}

class MonsterImport {

  constructor() {}

  _getJSON() {
    console.log(game);
  }

  testModal() {
    let launchInterface = new Dialog({
      title: 'OMG',
      content: '<p>WTF</p>',
      buttons: {
        one: {
          icon: '<i class="fas fa-file-upload"></i>',
          label: "Choose File",
          callback: () =>
            this.beginImport(
              window.Azzu.SettingsTypes.DirectoryPicker.format(game.settings.get("pf2e_monster_import", "folderDir"))
            ),
        }
      },
      default: "Cancel"
    });
    launchInterface.render(true);
  }

  async beginImport(dir) {

    let options = {};

    FilePicker.browse('data', dir, options);

  }

}

MonsterImportInit.init();