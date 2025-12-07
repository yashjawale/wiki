# Libgraph Setup

Libgraph is a quite a old library & for all use cases more modern solutions should be considered.

This guide is published since in some institutions it is still being used as part of syllabus & straightforward installation methods no longer exists.

These were last tested on Ubuntu 20.04, for newer implimentations using a solution like DevContainers is much preferred.

## Manual method
Use the below steps to setup libgraph on the system, at the end a bash script method is also available.

### System Preparation

Update and upgrade existing packages.
```bash
sudo apt update && sudo apt upgrade
```
Install the essential packages for building software & GNU C compiler
```bash
sudo apt install build-essential
```

### Downloading and Extraction

Download the libgraph source code archive.
```bash
wget "[http://download.savannah.gnu.org/releases/libgraph/libgraph-1.0.2.tar.gz](http://download.savannah.gnu.org/releases/libgraph/libgraph-1.0.2.tar.gz)"
```
Extract the downloaded archive file.
```bash
tar -xf libgraph-1.0.2.tar
```

Change the current directory into the extracted folder.
```bash
cd libgraph-1.0.2
```

### Repository Configuration

Add the 'universe' repository to access more packages.
```bash
sudo add-apt-repository universe
```
Update the package list again.
```bash
sudo apt update
```
Append the older Xenial universe repositories to the sources list.
```bash
echo "deb [http://us.archive.ubuntu.com/ubuntu/](http://us.archive.ubuntu.com/ubuntu/) xenial main universe" >> /etc/apt/sources.list
echo "deb-src [http://us.archive.ubuntu.com/ubuntu/](http://us.archive.ubuntu.com/ubuntu/) xenial main universe" >> /etc/apt/sources.list
```
Update the package list one more time.
```bash
sudo apt update
```

### Installing Dependencies

Install the necessary development libraries.
```bash
sudo apt-get install libsdl-image1.2 libsdl-image1.2-dev guile-2.0 \
guile-2.0-dev libsdl1.2debian libart-2.0-dev libaudiofile-dev \
libesd0-dev libdirectfb-dev libdirectfb-extra libfreetype6-dev \
libxext-dev x11proto-xext-dev libfreetype6 libaa1 libaa1-dev \
libslang2-dev libasound2 libasound2-dev
```

Ensure guile-2.0 development files are installed.
```bash
sudo apt install guile-2.0-dev
```

### Compilation and Installation

Set environment variables for Guile and run the first configuration step.
```bash
CPPFLAGS="$CPPFLAGS $(pkg-config --cflags-only-I guile-2.0)" \
  CFLAGS="$CFLAGS $(pkg-config --cflags-only-other guile-2.0)" \
  LDFLAGS="$LDFLAGS $(pkg-config --libs guile-2.0)" \
  ./configure
```
Run the configuration script again.
```bash
./configure
```
Compile the source code.
```bash
make
```
Install the compiled library files.
```bash
sudo make install
```
Copy the installed library files to the standard system directory.
```bash
sudo cp /usr/local/lib/libgraph.* /usr/lib
```

### Test Program

* Create a new file named `demo.cpp` containing a sample graphics program.
```cpp
#include <graphics.h>
int main()
{
    int gd = DETECT,gm,left=100,top=100,right=200,bottom=200,x= 300,y=150,radius=50;
    initgraph(&gd,&gm,NULL);
    rectangle(left, top, right, bottom);
    circle(x, y, radius);
    bar(left + 300, top, right + 300, bottom);
    line(left - 10, top + 150, left + 410, top + 150);
    ellipse(x, y + 200, 0, 360, 100, 50);
    outtextxy(left + 100, top + 325, "C Graphics Program");

    delay(5000);
    closegraph();
    return 0;
}
    ```
    
Compile the demo program & execute it

```bash
g++ demo.cpp -o demo -lgraph
./dmeo
```

## Automated method

Run this bash script to do it all in one go

```
sudo apt update && sudo apt upgrade
sudo apt install build-essential
sudo apt install gcc

wget "<http://download.savannah.gnu.org/releases/libgraph/libgraph-1.0.2.tar.gz>"
tar -xf libgraph-1.0.2.tar
cd libgraph-1.0.2
sudo add-apt-repository universe
sudo apt update
echo "deb <http://us.archive.ubuntu.com/ubuntu/> xenial main universe" >> /etc/apt/sources.list
echo "deb-src <http://us.archive.ubuntu.com/ubuntu/> xenial main universe" >> /etc/apt/sources.list
sudo apt update

sudo apt-get install libsdl-image1.2 libsdl-image1.2-dev guile-2.0 \\
guile-2.0-dev libsdl1.2debian libart-2.0-dev libaudiofile-dev \\
libesd0-dev libdirectfb-dev libdirectfb-extra libfreetype6-dev \\
libxext-dev x11proto-xext-dev libfreetype6 libaa1 libaa1-dev \\
libslang2-dev libasound2 libasound2-dev

sudo apt install guile-2.0-dev

CPPFLAGS="$CPPFLAGS $(pkg-config --cflags-only-I guile-2.0)" \\
  CFLAGS="$CFLAGS $(pkg-config --cflags-only-other guile-2.0)" \\
  LDFLAGS="$LDFLAGS $(pkg-config --libs guile-2.0)" \\
  ./configure

./configure

make

sudo make install

sudo cp /usr/local/lib/libgraph.* /usr/lib

cat << EOF >> demo.cpp
#include <graphics.h>
int main()
{
   int gd = DETECT,gm,left=100,top=100,right=200,bottom=200,x= 300,y=150,radius=50;
   initgraph(&gd,&gm,NULL);
   rectangle(left, top, right, bottom);
   circle(x, y, radius);
   bar(left + 300, top, right + 300, bottom);
   line(left - 10, top + 150, left + 410, top + 150);
   ellipse(x, y + 200, 0, 360, 100, 50);
   outtextxy(left + 100, top + 325, "C Graphics Program");

   delay(5000);
   closegraph();
   return 0;
}
EOF

```