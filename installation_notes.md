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


`
cparason@grimnir:~/code/orcaNet/nodesite-orcaNet/www$ docker images
REPOSITORY                       TAG                 IMAGE ID            CREATED             SIZE
cpsarason/data-science-geojson   latest              a5fcbe9d688e        13 minutes ago      6.37 GB
jupyter/datascience-notebook     latest              93936cc74dd8        2 weeks ago         6.3 GB
hello-world                      latest              f2a91732366c        3 months ago        1.85 kB
continuumio/anaconda3            latest              279ba92400be        3 months ago        3.05 GB
`
   

  
