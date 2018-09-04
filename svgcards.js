
/*
these data uri are base64 encoded
thanks firefox
*/
// data uri
let clubsData64 = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KICAgICAgICA8c3ZnIHZlcnN
pb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zy
IgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iM
HB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IgogICAgICAgIHZpZXdCb3g9IjAgMCA4LjYg
MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDguNiAxMDsiIHhtbDpzcGFjZT0
icHJlc2VydmUiPgogICAgICAgIDxnPgogICAgICAgIDxwb2x5Z29uIHBvaW50cz0iNCw1LjEgMi
wzLjkgMCw1LjEgMCw3LjQgMiw4LjYgNCw3LjQgCSIvPgogICAgICAgIDxwb2x5Z29uIHBvaW50c
z0iNi41LDMuOSA0LjUsNS4xIDQuNSw3LjQgNi41LDguNiA4LjYsNy40IDguNiw1LjEgCSIvPgog
ICAgICAgIDxwb2x5Z29uIHBvaW50cz0iNi4zLDMuNSA2LjMsMS4yIDQuMywwIDIuMywxLjIgMi4
zLDMuNSA0LjMsNC43IAkiLz4KICAgICAgICA8cG9seWdvbiBwb2ludHM9IjIuOSwxMCA1LjcsMT
AgNC4zLDcuNiAJIi8+CiAgICAgICAgPC9nPgogICAgICAgIDwvc3ZnPg==`;

let spadesData64 = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjE
iIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOn
hsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkd
Gg9IjMycHgiIGhlaWdodD0iMzJweCIKdmlld0JveD0iMCAwIDguNyAxMCIgc3R5bGU9ImVuYWJs
ZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOC43IDEwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgo
8cG9seWdvbiBwb2ludHM9IjQuMywwIDAsNC4zIDAsNi45IDIuMiw4LjEgNC4zLDYuOSA2LjUsOC
4xIDguNyw2LjkgOC43LDQuMyAJIi8+Cjxwb2x5Z29uIHBvaW50cz0iMi45LDEwIDUuOCwxMCA0L
jMsNy42IAkiLz4KPC9nPgo8L3N2Zz4=`;

let diamondsData64 = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjE
iIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIAp4bWxucz
p4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZ
HRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiCnZpZXdCb3g9IjAgMCA5LjEgMTAiIHN0eWxlPSJlbmFi
bGUtYmFja2dyb3VuZDpuZXcgMCAwIDkuMSAxMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cG9
seWdvbiBmaWxsPSJyZWQiIHBvaW50cz0iOS4xLDUgNC41LDEwIDAsNSA0LjUsMCAiLz48L3N2Zz
4=`;

let heartsData64=`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjE
iIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOn
hsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkd
Gg9IjMycHgiIGhlaWdodD0iMzJweCIKdmlld0JveD0iMCAwIDEwIDkuMyIgc3R5bGU9ImVuYWJs
ZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAgOS4zOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXR
oIGZpbGw9InJlZCIgZD0iTTUsOS4zbDUtNVYxLjRMNy41LDBMNSwxLjRMMi41LDBMMCwxLjR2Mi
45TDUsOS4zeiIvPgo8L3N2Zz4=`;

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      ctx.fill();
    }        
}
