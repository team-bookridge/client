import loadingIcon from '@/assets/loading-icon.png';

function LoadingSpiner() {
  return <img className="animate-spin" src={loadingIcon} alt="로딩" />;
}

export default LoadingSpiner;
