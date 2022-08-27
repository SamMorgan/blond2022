<svg id="filters" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<filter id="bleach" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    
    <feColorMatrix type="matrix" values="1 0 0 0 0
    1 0 0 0 0
    1 0 0 0 0
    0 0 0 1 0" in="bleach" result="colormatrix"/>
    <feComponentTransfer in="colormatrix" result="componentTransfer">
        <!-- <feFuncR type="table" tableValues="1 0.75"/>
        <feFuncG type="table" tableValues="0.48 0.75"/>
        <feFuncB type="table" tableValues="0.26 0.75"/>
        <feFuncA type="table" tableValues="0 1"/> -->
        <!-- <feFuncR type="table" tableValues=".9 .9 .9 .9 .8 .8 .9 .9 .9"/>
        <feFuncG type="table" tableValues=".9 .9 .9 .9 .5 .5 .9 .9 .9"/>
        <feFuncB type="table" tableValues="0 0 0 0 0 0 .1 .1 .9 .9 .9"/>
        <feFuncA type="table" tableValues="0 1"/> -->
        <feFuncR type="table" tableValues=".9 .9 .9 .9 .9"/>
        <feFuncG type="table" tableValues=".5 .5 .5 .9 .9"/>
        <feFuncB type="table" tableValues=" 0  0  0 .9 .9"/>
        <feFuncA type="table" tableValues="0 1"/>
    </feComponentTransfer>
    <!-- <feBlend mode="hard-light" in="componentTransfer" in2="bleach" result="blend"/> -->
    <feMorphology in2="bleach" operator="erode" radius="8" result="bleach2"/>
    <feGaussianBlur in2="bleach" stdDeviation="4" result="bleach"></feGaussianBlur>
    <feMorphology in2="bleach" operator="dilate" radius="8" result="expanded"/>
    <!-- <feMerge>
        <feMergeNode in="expanded"/>
        <feMergeNode in="bleach"/>
    </feMerge> -->
</filter>
</svg>