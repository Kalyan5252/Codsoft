import os
from PIL import Image as im

# print('Old Path is',os.getcwd())

os.chdir('/Users/kalyan/Desktop/MY FILES/Users dp/')
# print('Old Path is',os.getcwd())
# print(os.listdir())
# file = os.listdir()[0]
# print('RR file is',file)

for file in os.listdir():
    if file.split('.')[-1] == 'jpeg':
        # im.open(file).resize((500,500)).show()
        im.open(file).resize((500,500)).save(f'{os.getcwd()}/resized/{file}')
