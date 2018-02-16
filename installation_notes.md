# Basic Installation

The basic idea we will use for this project is to create everything as a 1-click (or close)
deploy so that this project can be as portable as possible. We will use docker and conda for 
package management, and maybe some shell scripts if needed. 

Ideally, running this project can happen as a jupyter notebook (to start) and then as a stand
alone Node.js project.

# Docker setup

1. Install docker for your OS according to their instructions: https://docs.docker.com/install/
  1. you may need to register for a docker account if you don't have one
 
1. Install the jupyter-datascience notebook from the docker hub:
  `# docker pull jupyter/datascience-notebook`
