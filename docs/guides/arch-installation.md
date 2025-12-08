# Arch Installation

## Barebones install

Boot into live Arch ISO

```bash
# Switch to a larger font for HiDPI screens
setfont ter-132b

# Verfiy boot mode
cat /sys/firmware/efi/fw_platform_size
```

### Connecting to internet

For ethernet connections, no action needed

Check devices
```bash
ip link
```

For WiFi devices, use `iwctl` to connect to a network

```bash
# INSIDE iwctl
get devices

# Find device here, eg. wlan0
# Scan for networks

station wlan0 scan

station wlan0 get-networks

station wlan0 connect MYNETWORK

# Exit after done
exit
```

```bash
ping -c 5 ping.archlinux.org
```

### Update clock

```bash
timedatectl
```

### Setting up disks

#### Partitioning

Check disks

```bash
lsblk OR fdisk -l
```

Connect to installation destination drive, eg. nvme0

```bash
fdisk /dev/nvme0n1

# Inside fdisk prompt
# Use g to start clean
# p to create partition
# t to change partition type
# d to delete partition

# In creating partitions, select default partition number & start sector
# For last sector, use size like +20G, to take up all remaining choose default
# Follow on screen list command to get code for partition type for t command

# w to finally write changes
```
Create the following partitions for a basic install:
(For UEFI systems)

If dual booting, don't create new EFI partition & just mount the old one later.

```
1. 2GB EFI
2. 12GB Linux SWAP (Recommended to have 1.5x of RAM size)
3. 30GB Linux Filesystem (for root)
4. Remaining space Linux Filesystem (for home directory)
```

#### Formatting

For Root & Home, use `mkfs.ext4 /dev/PARTITION`
For EFI, use `mkfs.fat -F32 /dev/PARTITION`
For SWAP, use `mkswap /dev/PARTITION`

Enable swap with `swapon /dev/PARTITION`

Confirm the changes with `lsblk`

#### Mount partitions

```bash
mount /dev/ROOT_PARTITION /mnt

mkdir /mnt/home
mount /dev/HOME_PARTITION /mnt/home

mkdir /mnt/boot
mount /dev/BOOT_PARTITION /mnt/boot
```

### Final steps

#### Selecting mirrors
Use reflector to select closest mirrors

```bash
reflector --country CODE --latest 5 --sort rate --save /etc/pacman.d/mirrorlist
```

#### Essential packages

```bash
pacstrap -K /mnt base linux linux-firmware base-devel vim nano network-manager
```

Generate fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Confirm all partitions are present in `/mnt/etc/fstab` with `cat`

#### Setting up new system

Change root into the new system

```bash
arch-chroot /mnt
```

Set timezone by linking appropriate file according to the location

```bash
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime

# Sync to hwclock
hwclock --systohc
```

Edit the file at `/etc/locale.gen` & uncomment desired locales

Then generate locales by running `locale-gen`

Create `/etc/locale.conf` file & set LANG variable

```conf
LANG=en_US.UTF-8
```

Can also set keyboard layout by adding `KEYMAP` variable to `/etc/vconsole.conf` file

Set hostname by writing desired hostname to `/etc/hostname` file

Set root password by running `passwd` command

Create new non-root user

```bash
useradd -m -G wheel,users myuser

passwd myuser
```

Enable NetworkManager service

```bash
systemctl enable NetworkManager
```

#### Setup GRUB

For UEFI systems first install `efibootmgr` before grub

Install grub with `pacman -S grub man-db man-pages` (man packages are unrelated but recommended to have)

Setup bootloader

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB

grub-mkconfig -o /boot/grub/grub.cfg
```

If dual booting, before rebooting install `os-prober` & run `os-prober` as root to detect & generate a boot entry. Don't format EFI partition.

#### Reboot into the new installation

```bash
exit # from chroot of new installation

umount -R /mnt

reboot
```

Remove the media while rebooting, after booting into new installation, use `nmtui` to connect to WiFi


## Post-install steps

Upgrade system with `pacman -Syu`

In TTY, install `termius-font` package to get larger font

Run `ls /usr/share/kbd/consolefonts` to get list of available fonts & set the desired one with `setfont ter-128b` or any desired one

To make the change permanent, modify `/etc/vconsole.conf` to add `FONT="ter-132b` with desired font

Then reboot

### Allowing sudo

Install `vi`

Modify sudoers file with visudo to allow wheel group to run commands with sudo

```bash
visudo

# Uncomment this line
# Uncomment to allow members of group wheel to execute any command - more secure
%wheel ALL=(ALL:ALL) ALL
```

### Installing AUR helper
In this case, paru

```bash
sudo pacman -S base-devel git

git clone https://aur.archlinux.org/paru.git

cd paru
makepkg -si

cd ..
rm -rf paru
```

### Other helpful packages

Vulkan packages for apps with hardware acceleration

```bash
sudo pacman -S mesa vulkan-intel
```

Bluetooth

```bash
sudo pacman -S bluez bluez-utils

sudo systemctl enable bluetooth

# bluetoothctl bluetui
```

Firmware updates

```bash
sudo pacman -S fwupd

fwupdmgr get-devices
fwupdmgr get-updates
fwupdmgr update
```

## Installing KDE Plama DE

```bash
sudo pacman -S plasma plasma-wayland-session konsole sddm
```

Enabling sddm service for login manager

```bash
sudo systemctl enable sddm
```

For smooth functioning

```
sudo pacman -S kde-cli-tools xde-desktop-portal xde-desktop-portal-kde kio nss
```
