# Flashing a GSI on Tab A8

These are my notes from flashing a GSI image onto Samsung Galaxy Tab A8 (SM-X200)

> Do note that flashing images onto devices may void their warranty & if not done correctly, may also brick your device. If you do decide to flash a custom ROM or a GSI onto your device, in case something goes wrong no one is liable except you. So tread cautiously.

For a GSI, the device needs to support project Treble (Commonly present in all devices shipped with Android 9+)
Check with any System Info apps is the device supports Project Treble.


## Pre-requisites
The following needs to be downloaded & drivers installed before beginning the process.

1. A archive extractor program (7-zip is a popular choice)
2. A GSI image, could be from official Android builds or community images
3. Google USB driver (https://developer.android.com/studio/run/win-usb)
4. Android Platform tools (https://developer.android.com/tools/releases/platform-tools)
5. Samsung USB driver (https://developer.samsung.com/android-usb-driver)
6. ODIN flasher ([odindownload](https://odindownload.com/SamsungOdin/) & [samfw](https://samfw.com/blog/download-odin-all-version) are popular sources)
7. TWRP build for your device (For X200 use https://xdaforums.com/t/recovery-unofficial-twrp-3-7-0-for-2021-galaxy-tab-a8-10-5-sm-x200.4488691/)
8. Device needs to be charged above 70%
9. Log out of all Google/Samsung accounts to avoid FRP locking

## Getting stock recovery image
This is specifically needed for A8 to boot into after flashing a GSI, it won't boot with TWRP due to a graphic driver issue.

To get the stock recovery image, download your device's firmware from [samfw.com](https://samfw.com).

From there unzip AB image & get the `recovery.img` file from it.

## Unlocking bootloader
Navigate to system settings & enable developer mode by tapping onto build number several times.
Then under the new Developer options menu use the OEM Unlock Bootloader option. (This option won't be present on One UI 8+ devices as now their bootloader can't be unlocked, the restriction also applies to carrier locked devices & there isn't a way to get around this)

Then Power off the device & press-hold Volume Up + Down buttons simultaneously (while still being powered off) & then plug in the USB cable into the computer.

A light blue screen will appear with a final warning & follow on-screen steps to unlock the bootloader. (After this there's no going back as for Knox devices an electronic fuse is tripped)

This will take you to new-like onboarding wizard, follow it as usual & then again enable developer options & enable USB debugging.

## Flashing TWRP recovery

This will be used for wiping device & then for booting into fastboot mode.

Shut down the device & then again to to download mode by press-holding Vol Up+Down & plugging in cable. After proceeding with on-screen instructions the device should be in download mode.

Now open the ODIN application on computer & flash the TWRP image under `AP` section of the app. Also keep auto-reboot option disabled & then flash recovery onto the device.

After that follow on-screen instruction on tablet to reboot & press-hold Power + Volume Up to boot into TWRP recovery.

## Wiping Device
In TWRP, go to Wipe menu & then "Format Data"
Then again from Wipe -> Factory Reset
Then reboot into Recovery

## Going into fastboot mode
After the tablet boots into TWRP recovery, go to Reboot menu & Select Fastboot

## Flashing images

Use the following to flash the GSI image

```bash
fastboot flash system file.img
```

Then again flash the stock recovery so system can boot into this

```bash
fastboot flash recovery recovery.img
```

Then finally, using TWRP reboot into `System` & we should be good to go, the first boot takes a bit longer than usual.

If you get an error on stock recovery, select the option to factory reset & it should boot correctly.

## Credits & References
- https://xdaforums.com/t/my-success-story-how-i-flashed-a-custom-rom-on-my-tab-a8-sm-x205-also-works-on-the-sm-x200.4764568/
- https://xdaforums.com/t/complete-gsi-list-samsung-galaxy-tab-a8.4619197/
- https://xdaforums.com/t/gsi-list-best-working-gsis-for-sm-x200-x205-latest-october-2025.4763792/
- https://youtu.be/aVtWX9UiQP0
- https://youtu.be/4w9BqH2WPmc
