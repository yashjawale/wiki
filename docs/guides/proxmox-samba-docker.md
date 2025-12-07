# Samba server with Docker on LXC

## User Setup

Install the `curl` package for downloading files.
    ```bash
    apt install curl
    ```
Create a new user named **youruser**.
    ```bash
    adduser youruser
    ```
Add the new user **youruser** to the `sudo` group.
    ```bash
    usermod -aG sudo youruser
    ```

## Docker Installation within LXC

**Log out and log back in** with the new user **youruser**.
Download and execute the official Docker installation script.
    ```bash
    curl -sSL https://get.docker.com | sh
    ```
Add the current user (`youruser`) to the `docker` group.
    ```bash
    sudo usermod -aG docker youruser
    ```

## Shared Directory Setup

Create a directory named `/share` for file sharing.
    ```bash
    sudo mkdir /share
    ```
Change the permissions of `/share` to allow full access.
    ```bash
    sudo chmod 777 /share
    ```

> 💡 **Disk Space Check:** To check the available disk space for your container's file system, use the command `df -h`. This command (**d**isk **f**ree, **-h**uman readable) shows the total size, used space, and available space of the mounted file systems in an easy-to-read format (e.g., GB or MB).

## Samba Container Deployment (dperson/samba)

Run a Samba container named `samba`.
    ```bash
    sudo docker run --restart unless-stopped --name samba -p 139:139 -p 445:445 -v /share:/share -d dperson/samba -u "youruser;password" -s "public;/share;yes;no;yes"
    ```
List running Docker containers to verify the Samba container is active.
    ```bash
    docker ps
    ```

## Accessing the Share

Get the IP address of your LXC.
    ```bash
    ip a
    ```
Access the share from a client machine using the IP address.
    ```
    smb://ipaddress
    ```
If the share runs out of space, **change the disk size of the CT** in the Proxmox interface to allocate more storage to the `/share` folder. Confirm the change using `df -h`.