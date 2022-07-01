
<div class="loading"></div>

<style>
  .loading{
    @apply h-16 w-16 bg-blue-500 rounded-full animate-[pulseOut_1s_infinite];
  }

  @keyframes pulseOut {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    70% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
</style>