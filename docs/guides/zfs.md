# Managing ZFS Pools

## Pre-requisites
Needs `zfsutils-linux` package to be installed
Should be available on distribution's repositories.

Check with
```bash
whereis zfs
```

## Creating Pools

Check installed drives by running:

```bash
sudo fdisk -l
```

> The below part is taken from Ubuntu tutorials at https://ubuntu.com/tutorials/setup-zfs-storage-pool#3-creating-a-zfs-pool

There are two types of simple storage pools we can create. A `striped pool` , also called RAID-0 , in which the data is stored in “stripes” across all drives, or a `mirrored pool` , also called RAID-1 , in which a complete copy of all data is stored separately on each drive. Striped pools are not fault tolerant whereas mirrored pools can survive the failure of one drive. Striped pools have twice the storage capacity of mirrored pools and have better performance than mirrored pools.

To create a striped pool, we run:

```bash
sudo zpool create new-pool /dev/sdb /dev/sdc
```

To create a mirrored pool, we run:

```
sudo zpool create new-pool mirror /dev/sdb /dev/sdc
```
In both examples, `new-pool` is the name of the pool.

A mirrored pool is usually recommended as we’d still be able to access our data if a single drive fails. However, this means that we’ll only get the capacity of a single drive. A striped pool, while giving us the combined storage of all drives, is rarely recommended as we’ll lose all our data if a drive fails. You can also opt for both, or change the designation at a later date if you add more drives to the pool.

The newly created pool is mounted at `/new-pool`. You can select a different mount point using the -m option:

```bash
sudo zpool create -m /usr/share/pool new-pool mirror /dev/sdb /dev/sdc
```

> For other kinds of RAID setup refer this resource by Ubuntu at https://wiki.ubuntu.com/Kernel/Reference/ZFS?_gl=1*166uyzo*_gcl_au*MTk3NTIyMTcwMi4xNzY2NTE1OTA5

### Importing existing pools

Use `zfs import` command to detect & import existing zfs pools. Commonly needed after OS reinstall.

Might also need to use `-f` flag in some cases.

## Checking status

```bash
zpool status
```

## Working with datasets
Setting separate datasets inside a pool for major applications can help manage space & isolate volumes.

Create new dataset with `zfs create pool_name/dataset`

Can be verified with `zfs list`

### Working with quotas
Helps with setting limits for datasets

```bash
# Getting quota
zfs get quota poolname/dataset

# Setting quota
zfs set quota=100G poolname/dataset
```

## Removing pool

```bash
# ⚠️ This WILL also remove the data from the pool
zpool destroy new-pool
```


Can confirm with `zpool status`
