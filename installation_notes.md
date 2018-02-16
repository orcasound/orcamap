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




  
