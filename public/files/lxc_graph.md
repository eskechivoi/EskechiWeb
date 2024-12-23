graph TD;
    Host[Host]
    LXCContainer1[LXC Container 1]
    LXCContainerN[LXC Container N]
    DockerContainer1[Docker Container 1]
    DockerContainer2[Docker Container 2]
    DockerContainerN[Docker Container N]

    Host --> LXCContainer1
    Host --> LXCContainerN
    LXCContainer1 --> DockerContainer1
    LXCContainer1 --> DockerContainer2
    LXCContainerN --> DockerContainerN