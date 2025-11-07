 const imageInput = document.getElementById("imageInput");
 const targetSize = document.getElementById("targetSize");
 const compressBtn = document.getElementById("compressBtn");
 const output = document.getElementById("output");
 const downloadLink = document.getElementById("downloadLink");
 const preview = document.getElementById("preview");

 compressBtn.addEventListener("click", () => {
     const file = imageInput.files[0];
     if (!file) return alert("Please select an image!");
     if (!targetSize.value) return alert("Enter target size in KB!");

     const reader = new FileReader();
     reader.onload = (event) => {
         const img = new Image();
         img.src = event.target.result;

         img.onload = () => {
             const canvas = document.createElement("canvas");
             const ctx = canvas.getContext("2d");
             const maxDim = 800;
             const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
             canvas.width = img.width * scale;
             canvas.height = img.height * scale;
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

             let quality = 0.9;
             const targetBytes = targetSize.value * 1024;
             let result = canvas.toDataURL("image/jpeg", quality);

             while (result.length > targetBytes && quality > 0.1) {
                 quality -= 0.05;
                 result = canvas.toDataURL("image/jpeg", quality);
             }

             const finalSize = (result.length / 1024).toFixed(2);
             output.innerHTML = `✅ Final Size: ${finalSize} KB`;
             preview.src = result;
             preview.style.display = "block";

             downloadLink.href = result;
             downloadLink.style.display = "inline-block";
         };
     };
     reader.readAsDataURL(file);
 });