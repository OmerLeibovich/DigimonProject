import { updateList } from "./create.js";
import { getshopitems, getuseritems } from "./userDigiAndItems.js";
/// move to other digimon card
export function MobileDigi() {
  let CurrentIndex = 0;
  let isLoading = false;

  //user digimons right arrow
  $(document).on('click', '#digi-right-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return; 
    isLoading = true;

    CurrentIndex++;
    await updateCard(CurrentIndex,"digimons");

    isLoading = false;
  });
  //user digimons left arrow
  $(document).on('click', '#digi-left-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return;
    isLoading = true;

    CurrentIndex--;
    await updateCard(CurrentIndex,"digimons");

    isLoading = false;
  });
  // user items right arrow
   $(document).on('click', '#bag-right-arrow',async function (e) {
        e.preventDefault();
        if (isLoading) return; 
          isLoading = true;

      CurrentIndex++;
      await updateCard(CurrentIndex,"items");

      isLoading = false;
    
   });
   // user items left arrow
    $(document).on('click', '#bag-left-arrow',async function (e) {
      e.preventDefault();
      if (isLoading) return; 
        isLoading = true;

      CurrentIndex--;
      await updateCard(CurrentIndex,"items");

      isLoading = false;
    
   });
   // shop items right arrow
   $(document).on('click', '#shop-right-arrow',async function (e) {
        e.preventDefault();
        if (isLoading) return; 
          isLoading = true;

      CurrentIndex++;
      await updateCard(CurrentIndex,"shop");

      isLoading = false;
    
   });
   // shop items left arrow
    $(document).on('click', '#shop-left-arrow',async function (e) {
      e.preventDefault();
      if (isLoading) return; 
        isLoading = true;

      CurrentIndex--;
      await updateCard(CurrentIndex,"shop");

      isLoading = false;
    
   });
    // update user items list
    // update user digimon list
  async function updateCard(i,page) {
    if (page==="digimons"){
    await updateList(null, i); 
    }
    else if(page==="items"){
    await getuseritems(i); 
    }
    else if(page==="shop"){
      await getshopitems(i)
    }
    CurrentIndex = $('.mobile-card').data('index') ?? i;
  }

}
