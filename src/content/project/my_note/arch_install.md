---
slug: arch_install_and_setup
title: ArchLinux Install and Setup
date: 2026-05-29
description: Arch Linux Install and Setup
---

# 1. connect to wifi
:`iwctl`  

:`device list` (will see wlan0 or wlp2s0)  

:`station wlan0 scan`  

:`station wlan0 get-networks`  

:`station wlan0 connect YOUR_SSID`  

:`exit` and test :`ping archlinux.org`  

# 2. archinstall script:
:`archinstall`  
> Select Archinstall language  
  Select keyboard layout: `EN(us)`  
  Select mirror region `Taiwan`  
  Select harddrives: `best-effort default partition layout, ext4`  
  Specify hostname  
  Set root password  
  Specify user account:`same as superuser`  
  Specify profile: `Minimal`  
  Select audio: `Pipewire`  
  Kernels: `linux, linux-lts`  
  Configure network  
  Select timezone: `Asia/Taipei`  
  select `install`  
  :`sudo pacman -Sy`, and reboot  
 
:`sudo shutdown now`(turn off)
`ctrl + alt + f2` (enter TTY)  

:`sudo pacman -S git` (git install) , `git --version` (Check the installations)  

:`sudo pacman -S base-devel git` (Development Tools install)  

:`sudo pacman -S vim` (vim install)  
> :`git clone https://aur.archlinux.org/yay.git` (yay install)  
  :`cd yay`  
  :`makepkg -si`  

# 3. Hyprland setup:
## Installing JaKooLit Arch-Hyprland Script
:`git clone --depth=1 https://github.com/JaKooLit/Arch-Hyprland.git ~/Arch-Hyprland`  

:`cd ~/Arch-Hyprland`  

:`chmod +x install.sh`  

:`./install.sh`  

# 4. Traditional Chinese and Chewing:
## zh_TW:
:`sudo nano /etc/locale.gen`

delete `#` in front of `zh_TW.UTF-8 UTF-8`

:`sudo locale-gen`

:`sudo nano /etc/locale.conf`

add:
```tx=
LANG=en_US.UTF-8
LC_CTYPE=zh_TW.UTF-8
```
## keyboard:
:`sudo pacman -S fcitx5-im fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-chewing`

:`nano ~/.xprofile`

add:
```tx=
#!/bin/bash
# 設定 Fcitx5 輸入法所需環境變數
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS="@im=fcitx5"
export SDL_IM_MODULE=fcitx5
export GLFW_IM_MODULE=ibus
export INPUT_METHOD=fcitx5
export MOZ_ENABLE_WAYLAND=1
# 啟動 Fcitx5 輸入法守護程式（若尚未啟動）
pgrep -x fcitx5 >/dev/null || fcitx5 -d &
```
:`chmod +x ~/.config/hypr/fcitx.sh`

:`nano ~/.config/hypr/hyprland.conf`, add `exec-once = ~/.config/hypr/fcitx.sh`

:`sudo pacman -S noto-fonts-cjk noto-fonts ttf-dejavu ttf-liberation`

:`fcitx5-configtool`

# 5. Kitty Terminal
:`yay -S ttf-jetbrains-mono-nerd ttf-fira-code-nerd ttf-hack-nerd`

:`nano ~/.config/kitty/kitty.conf`

modify:
```tx=
font_family         JetBrainsMono Nerd Font
bold_font           auto
italic_font         auto
bold_italic_font    auto
font_size           12.0
```