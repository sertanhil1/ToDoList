const inputBox= document.getElementById("input-box");
const listContainer= document.getElementById("list-container");

function addTask(){
  if(inputBox.value === ''){ // eğer 'input-box' boş işe ekranda 'bir şeyler yazmalısın'uyarısı verilecek
    alert("You must write somethnig!")
  }
  else{
    let li = document.createElement("li"); //Bu satır, yeni bir <li> (liste öğesi) elementi oluşturur. document.createElement() fonksiyonu, HTML dokümanına yeni bir eleman eklemek için kullanılır.
    li.innerHTML = inputBox.value;// Oluşturulan <li> öğesinin içeriğini inputBox adlı bir form kontrolünden (örneğin, bir metin kutusundan) alınan değerle doldurur. inputBox.value ifadesi, inputBox elemanının mevcut değerini alır ve bunu <li> öğesinin içeriği olarak ayarlar.
    listContainer.appendChild(li);//listContainer adlı bir HTML elemanına (muhtemelen bir <ul> veya <ol> elementi) oluşturulan <li> öğesini ekler. appendChild() fonksiyonu, belirtilen çocuk öğeyi mevcut bir elementin sonuna ekler.
    let span = document.createElement("span");//Bu satır, bir <span> HTML elemanı oluşturur. document.createElement("span") fonksiyonu, yeni bir <span> öğesi oluşturur ve bu öğe span değişkenine atanır.
    span.innerHTML = "\u00d7";//Bu satır, oluşturulan <span> elemanının içeriğini ayarlar. "\u00d7" ifadesi, Unicode karakteri ×'i temsil eder. Yani, <span> öğesinin içinde × işareti görüntülenir.
    li.appendChild(span);//Bu satır, daha önce oluşturulan span öğesini mevcut bir liste öğesi (<li>) elemanına ekler. appendChild() fonksiyonu, li öğesinin sonuna yeni bir çocuk öğe ekler.
  }
  inputBox.value = "";
  saveData();
}


listContainer.addEventListener("click", function(e){//listContainer öğesi üzerine bir click (tıklama) olayı ekler.tıklama yapıldığında belirli bir işlevi (function(e) { ... }) gerçekleştirir.
  if(e.target.tagName === "LI"){///Eğer tıklanan öğenin (e.target) etiket adı "LI" ise, bu durumda tıklanan li öğesine checked sınıfı eklenir
    e.target.classList.toggle("checked");
    saveData()
  }
  else if(e.target.tagName === "SPAN"){//Eğer tıklanan öğenin etiket adı "SPAN" ise, bu durumda tıklanan span öğesinin ebeveyn öğesini (parentElement) kaldırır. Bu, span öğesinin bulunduğu li öğesinin silinmesine neden olur.
    e.target.parentElement.remove();
    saveData()
  }
},false);//false: Olayın yakalanma aşaması olarak "bubbling" (baloncuk) aşamasında çalışır. Yani, olay önce hedef öğede yakalanır ve sonra yukarı doğru yayılır.


function saveData(){//saveData: listContainer'ın içeriğini localStorage'a kaydeder.

  localStorage.setItem("data", listContainer.innerHTML)//Bu fonksiyon, localStorage'da "data" anahtarı altında bir veri saklar.Veriyi saklamak için listContainer adlı HTML elementinin içeriğini (innerHTML) alır ve bunu localStorage.setItem fonksiyonu ile "data" anahtarı altında saklar.
}

function showTask(){//showTask: localStorage'dan kaydedilmiş veriyi alır ve listContainer'a geri yükler.
  
  listContainer.innerHTML = localStorage.getItem("data");//Bu fonksiyon, localStorage'dan "data" anahtarı altında saklanan veriyi alır.Veriyi listContainer adlı HTML elementinin içeriğine (innerHTML) atar.
}

showTask();