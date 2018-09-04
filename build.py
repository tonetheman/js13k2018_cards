"""
This was done on a windows machine. The paths will need to be adjusted.
:)
"""

import shutil
import os

# change this to where closure is located on your machine
CLOSURE_LOCATION = "\\programs\\google_closure\\closure-compiler-v20180805.jar"

"""
* basestate.js
* button.js
* cards_and_piles.js
* game_over_state.js
* imgloader.js
* jsfxr.min.js
* levels.js
* menu_loading_state.js
X particles.js <-- NOT USED
* pmain.js
* svgcards.js
* tinygame.js
* winning_state.js
"""

build_files = ["jsfxr.js", "basestate.js","tinygame.js", "pmain.js","svgcards.js", "imgloader.js",
"cards_and_piles.js", "button.js", 
"game_over_state.js","menu_loading_state.js","winning_state.js",
"levels.js"]

print("deleteing build directory")
shutil.rmtree("build",ignore_errors=True)

print("making build directory")
os.mkdir("build")

print("shoving files together")
outf = None
try:
    outf = open("build\\tmp.js","w")

    for f in build_files:
        inf = open(f,"r")
        data = inf.read()
        inf.close()
        outf.write(data)
        outf.write("\n")
finally:
    if outf is not None:
        outf.close()

print("waiting ...")
# now run closure on the whole mess
import time
time.sleep(3)

print("running closure...")
cmd = "java -jar " + CLOSURE_LOCATION + " --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file build\\out.js build\\tmp.js"
res = os.system(cmd)
print("res from running closure",res)

print("removing tmp.js file...")
os.remove("build\\tmp.js")

print("copying final index.html")
shutil.copyfile("final_index.html", "build\\index.html")

# print("copying jsfxr.min.js...")
# shutil.copyfile("jsfxr.min.js", "build\\jsfxr.min.js")

print("running zip commands")
os.chdir("build")
import zipfile
outf = zipfile.ZipFile("js13kcards.zip","w",zipfile.ZIP_DEFLATED)
outf.write("index.html")
# outf.write("jsfxr.min.js")
outf.write("out.js")
outf.close()

print("done")
