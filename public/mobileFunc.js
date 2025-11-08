import { updateList } from "./create.js";
/// move to other digimon card
export function MobileDigi() {
  let currentIndex = 0;
  let isLoading = false;


  $(document).on('click', '.right-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return; 
    isLoading = true;

    currentIndex++;
    await updateDigimonCard(currentIndex);

    isLoading = false;
  });

  $(document).on('click', '.left-arrow', async function (e) {
    e.preventDefault();
    if (isLoading) return;
    isLoading = true;

    currentIndex--;
    await updateDigimonCard(currentIndex);

    isLoading = false;
  });

  async function updateDigimonCard(i) {
    await updateList(null, i); 
    currentIndex = $('.digi-mobile-card').data('index') ?? i;
  }
}
