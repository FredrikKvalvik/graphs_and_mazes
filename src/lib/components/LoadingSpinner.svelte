
<script lang="ts">
  export let size: "sm" | "md" | "lg" = "sm";

  const sizeMap = {
    sm: "h-16 w-16 -mt-8 -mr-8",
    md: "h-24 w-24 -mt-12 -mr-12",
    lg: "h-32 w-32 -mt-16 -mr-16",
  };
</script>

<div class="loading {sizeMap[size]}"></div>

<style>
  .loading{
    @apply bg-blue-500 rounded-full animate-[pulseOut_1s_infinite];
  }

  @keyframes pulseOut {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    70% {
      transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>