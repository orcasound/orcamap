# Basic Installation

The basic idea we will use for this project is to create everything as a 1-click (or close)
deploy so that this project can be as portable as possible. We will use docker and conda for 
package management, and maybe some shell scripts if needed. 

Ideally, running this project can happen as a jupyter notebook (to start) and then as a stand
alone Node.js project.

# Docker setup

1. Install docker for your OS according to their instructions: https://docs.docker.com/install/ 
   you may need to register for a docker account if you don't have one
 
1. Install the jupyter-datascience notebook from the docker hub: https://hub.docker.com/r/jupyter/datascience-notebook/

    `# docker pull jupyter/datascience-notebook`
  
3. Figure out where you want to put jupyter notebooks and other files (should probably be where you 
checked this out from git). I have a directory called "jupyter-notebooks" that houses the code 
related to this project. You should change the path in the -v argument to reflect your setup.

    `# docker run -it --rm -p 8888:8888 -v /home/cpsarason/code/jupyter-notebooks:/home/jovyan jupyter/datascience-notebook start.sh jupyter lab`
  
4. Point your browser to: http://localhost:8888
1. Wheee!

To "stop" this image from running, try the following from another terminal window (since the terminal where you ran the docker command has console output spitting out on it)

 * List the docker images

    `# docker ps -a`

 * find the right docker id for you image, then "stop"

    `# docker stop <docker-image-id>

This will prevent you from spinning up a zillion different docker images, and will become important when we
commit a new docker image after upgrading it a bit.

# Conda Setup

For notes on conda environemnts and their management, read: https://conda.io/docs/user-guide/tasks/manage-environments.html

Basic idea is to take the plain docker image, create an "orcaSound" conda environment using the spec-file located in setup/spec-file.txt

This is also a bit overkill. To speed things along, we're just going to install the conda packages we want, stop the docker image and commit it, where we can then start it from scratch. Not super elegant (probably should use Docker Files for this) but works.


```shell
cparason@grimnir:~/code/orcaNet/nodesite-orcaNet/www$ docker images
REPOSITORY                       TAG                 IMAGE ID            CREATED             SIZE
cpsarason/data-science-geojson   latest              a5fcbe9d688e        13 minutes ago      6.37 GB
jupyter/datascience-notebook     latest              93936cc74dd8        2 weeks ago         6.3 GB
hello-world                      latest              f2a91732366c        3 months ago        1.85 kB
continuumio/anaconda3            latest              279ba92400be        3 months ago        3.05 GB
```

Now you can start up an instance and start customizing additional packages. I have installed some additional python packages to the juptyer/datascience-notebook image and created something I'm going to call cpsarason/datascience-plus.

```shell
jovyan@8c6733bd24d0:~$ conda install -c conda-forge geojson
Fetching package metadata ...............
Solving package specifications: .

Package plan for installation in environment /opt/conda:

The following NEW packages will be INSTALLED:

    geojson: 2.3.0-py_0 conda-forge

Proceed ([y]/n)? y

geojson-2.3.0- 100% |############################################################| Time: 0:00:00 156.22 kB/s
jovyan@8c6733bd24d0:~$ conda install -c conda-forge altair
Fetching package metadata ...............
Solving package specifications: .

Package plan for installation in environment /opt/conda:

The following NEW packages will be INSTALLED:

    altair: 1.2.1-py_0   conda-forge
    vega:   0.4.4-py36_1 conda-forge

Proceed ([y]/n)? y

vega-0.4.4-py3 100% |############################################################| Time: 0:00:00 966.23 kB/s
altair-1.2.1-p 100% |############################################################| Time: 0:00:00   3.04 MB/s
Installing /opt/conda/lib/python3.6/site-packages/vega/static -> jupyter-vega
Making directory: /opt/conda/share/jupyter/nbextensions/jupyter-vega/
Copying: /opt/conda/lib/python3.6/site-packages/vega/static/vega.html -> /opt/conda/share/jupyter/nbextensions/jupyter-vega/vega.html
Copying: /opt/conda/lib/python3.6/site-packages/vega/static/index.js -> /opt/conda/share/jupyter/nbextensions/jupyter-vega/index.js
Copying: /opt/conda/lib/python3.6/site-packages/vega/static/vega.js -> /opt/conda/share/jupyter/nbextensions/jupyter-vega/vega.js
Copying: /opt/conda/lib/python3.6/site-packages/vega/static/index.js.map -> /opt/conda/share/jupyter/nbextensions/jupyter-vega/index.js.map
Copying: /opt/conda/lib/python3.6/site-packages/vega/static/vega-lite.html -> /opt/conda/share/jupyter/nbextensions/jupyter-vega/vega-lite.html
- Validating: OK

    To initialize this nbextension in the browser every time the notebook (or other app) loads:
    
          jupyter nbextension enable vega --py --sys-prefix
    

jovyan@8c6733bd24d0:~$ 
```

Now, I just need to stop the docker image, use the docker id shown at the joyvan shell prompt and create a new image. Sweet!

```shell
cpsarason@grimnir:~/code/orcaNet/nodesite-orcaNet/www$ docker ps -a
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                    NAMES
8c6733bd24d0        jupyter/datascience-notebook   "tini -- start.sh ..."   6 minutes ago       Up 6 minutes        0.0.0.0:8888->8888/tcp   heuristic_bartik
cpsarason@grimnir:~/code/orcaNet/nodesite-orcaNet/www$ docker commit -m "added geojson and altair via conda" -a "Christian P. Sarason" 8c6733bd24d0 cpsarason/datascience-plus
sha256:6373989fa2fffa5c44cc414086f285a0bcc1a6ef23cce8386be721abe9a0e30e
cpsarason@grimnir:~/code/orcaNet/nodesite-orcaNet/www$ 

```

I basically adapted the instructions from digital ocean at: 
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04



  
