import re
from pynput import keyboard

Enter=0
backspace=0
eisu=0
length=0

def onpress(key):
    global backspace,Enter,eisu,length


    if (key == keyboard.Key.backspace):
         backspace=backspace+1
         print("backspace=",backspace)
    if (key == keyboard.Key.enter):
         Enter=Enter+1
         print("enter=",Enter)
    try:
        if key.char == 'a'\
          or key.char == 'b'\
          or key.char == 'c'\
          or key.char == 'd'\
          or key.char == 'e'\
          or key.char == 'f'\
          or key.char == 'g'\
          or key.char == 'h'\
          or key.char == 'i'\
          or key.char == 'j'\
          or key.char == 'k'\
          or key.char == 'l'\
          or key.char == 'm'\
          or key.char == 'n'\
          or key.char == 'o'\
          or key.char == 'p'\
          or key.char == 'q'\
          or key.char == 'r'\
          or key.char == 's'\
          or key.char == 't'\
          or key.char == 'u'\
          or key.char == 'v'\
          or key.char == 'w'\
          or key.char == 'x'\
          or key.char == 'y'\
          or key.char == 'z'\
          or key.char == '1'\
          or key.char == '2'\
          or key.char == '3'\
          or key.char == '4'\
          or key.char == '5'\
          or key.char == '6'\
          or key.char == '7'\
          or key.char == '8'\
          or key.char == '9'\
          or key.char == '0':
        
         eisu=eisu+1
         print("eisu=",eisu)
         
    except AttributeError:
        pass
         
    

with keyboard.Listener(on_press=onpress) as Listener:
    Listener.join()
