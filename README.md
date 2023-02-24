# Uplader-Script

Script to Upload more file to IPFS faster using the WakeUp API endpoint.

For example for a collection of 1000 items, this script that uploads PNG image files located in a specific folder and its subfolders to a remote server (*files* folder in the root directory). This program requires an API key of WakeUp to authenticate the upload requests, which must be provided as a command-line argument.

The program works by reading the contents of the specified folder and its subfolders, and for each PNG file it finds, it creates a message that contains the file's contents and sends it to the remote server. If the upload is successful, the program will print a message with all the information returned by this endopoint for each request. If there's an error, it will print an error message. In essence, this script helps you to automate the task of uploading PNG files to a server, saving you time and effort.

This repo serves as an example of how our api can be used.