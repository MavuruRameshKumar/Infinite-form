var parent;
function newLine(clickedButton,isNested){
	var spanIndex; 
	var finalSpanIndex="";
	var nestedLastEle="";
	 if(isNested){
		  parent = clickedButton.parentElement;
		  nestedLastEle = parent.lastElementChild.firstElementChild;
		  if(nestedLastEle!=null && nestedLastEle!= undefined){
			spanIndex = nestedLastEle.innerHTML;
			finalSpanIndex = findFinalSpanIndex(spanIndex);
		  }else{
			finalSpanIndex = parent.firstElementChild.innerHTML+".1";
		  }
	 }else{
		  parent = clickedButton.parentElement.parentElement;
		  spanIndex = clickedButton.parentElement.parentElement.lastElementChild.firstElementChild.innerHTML;
	  if(spanIndex.indexOf('.')!=-1)
	  {
		  finalSpanIndex = findFinalSpanIndex(spanIndex);
	  }else{
		  finalSpanIndex = parseInt(spanIndex)+1;
	  }
	 }
	function findFinalSpanIndex(spanIndex){
		var index = spanIndex.lastIndexOf('.');
		var indexStart = spanIndex.substring(0,index+1);
		var indexEnd = spanIndex.substring(index+1);
		return indexStart.concat(""+(parseInt(indexEnd)+1));
	}
	
	var mainElement = document.createElement("div");
	mainElement.className = 'form-block';
	mainElement.appendChild(getSpan(finalSpanIndex));
	mainElement.appendChild(getButton("nonNested"));
	mainElement.appendChild(getButton("nested"));
	mainElement.appendChild(getInput());
	mainElement.appendChild(getButton("addInput"));
	parent.appendChild(mainElement); 
 }
 
 function addInput(clickedButton){
	parent = clickedButton.parentElement;
	var input = getInput();
	parent.insertBefore(input, clickedButton);
}
function getInput(){
  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.placeholder = "Enter Value...";
  return input;
}

function getSpan(finalSpanIndex){
  var span = document.createElement("span");
  span.className = "line";
  span.textContent = finalSpanIndex;
  return span;
}

function getButton(isNested){
  var input = document.createElement("button");
  if(isNested == "nonNested"){
	  input.className = "new-line";
	  input.innerHTML = "New Line";
	  input.onclick = function()
	  {
	  newLine(this,false);
	  return false;
	  };
  }else if(isNested == "nested"){
	  input.className = "new-nested";
	  input.innerHTML = "New Nested Line";
	  input.onclick = function()
	  {
	  newLine(this,true);
	  return false;
	  };
  
  }
  else{
	  input.className = "new-input";
	  input.innerHTML = "Add Input";
	  input.onclick = function()
	  {
	  addInput(this);
	  return false;
	  };
  }
  return input;
}