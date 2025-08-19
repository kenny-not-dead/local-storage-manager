<h1 align="center">Local storage manager</h1>
<p align="center">Allows you to manage your browser's local storage state from the terminal</p>

# About

During development, especially with services that require authorization and use horizontal frontend architecture, I wanted to automate the process of transferring information from local storage, in my case these were tokens, so the initial script was written. After using it for a few days I noticed a significant saving of my time, so I decided to share it with the community, I hope it will be useful to someone

# Usage

To install local-storage-manager, use the command below. Please use the flag for global installation

```bash
npm install @kenny-not-dead/local-storage-manager -g
```

Set the configuration.

```bash
local-storage-manager config:edit
```

| **Name**              | **Description**                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **userDataDir**       | pay special attention to this setting. It indicates the location of the data for your browser. By default, I have specified an example of the setting for my browser chrome on Linux |
| **targetURL**         | URL from where we copy the data                                                                                                                                                      |
| **destinationURL**    | URL where we copy the data.                                                                                                                                                          |
| **keys**              | keys you want to copy.                                                                                                                                                               |
| **closeBrowserAfter** | close the browser when finished. _NOTE: In the current version, any actions occur in the background, without opening the browser_                                                    |

</p>

After setting up, you can run the command to copy the data. It is important that your browser is turned off when copying data

```bash
local-storage-manager transfer
```

# Commands

| **Command**     | **Description**                                                                                            | **Params**                                                                                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **transfer**    | Transfers information from local storage from one URL to another. Keys and URLs are pulled from the config |                                                                                                                                                                                |
| **config:edit** | Opens current configurations in an editor (default is vim)                                                 |                                                                                                                                                                                |
| **get**         | Outputs all available values from local storage at the specified URL                                       | _get target_ - uses targetURL from config; <br> _get destination_ - uses destinationURL from config; <br> _get [URL]_ - uses at the specified URL (ex. get https://google.com) |
