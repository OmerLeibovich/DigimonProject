import { updateList } from "./create.js";
import { getuseritems } from "./userDigiAndItems.js";
/// move to other digimon card
export function MobileDigi() {
  let digiCurrentIndex = 0;
  let itemCurrentIndex = 0;
  let isLoading = false;

  //user digimons right arrow
  $(document).on('click', '#digi-right-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return; 
    isLoading = true;

    digiCurrentIndex++;
    await updateDigimonCard(digiCurrentIndex);

    isLoading = false;
  });
  //user digimons left arrow
  $(document).on('click', '#digi-left-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return;
    isLoading = true;

    digiCurrentIndex--;
    await updateDigimonCard(digiCurrentIndex);

    isLoading = false;
  });
  // update user digimon list
  async function updateDigimonCard(i) {
    await updateList(null, i); 
    digiCurrentIndex = $('.mobile-card').data('index') ?? i;
  }

  // user items right arrow
   $(document).on('click', '#bag-right-arrow',async function (e) {
        e.preventDefault();
        if (isLoading) return; 
          isLoading = true;

      itemCurrentIndex++;
      await updateItemCard(itemCurrentIndex);

      isLoading = false;
    
   });
   // user items left arrow
    $(document).on('click', '#bag-left-arrow',async function (e) {
      e.preventDefault();
      if (isLoading) return; 
        isLoading = true;

      itemCurrentIndex--;
      await updateItemCard(itemCurrentIndex);

      isLoading = false;
    
   });
    // update user items list
     async function updateItemCard(i) {
    await getuseritems(i); 
    itemCurrentIndex = $('.mobile-card').data('index') ?? i;
  }
}
