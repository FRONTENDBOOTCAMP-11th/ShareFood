import Layout from '../../components/Layout';
import icon from '/images/greenchef.svg';

const MyPage = () => {
  return (
    <div className="py-[24px] px-[17px] bg-back1">
      <Layout>
        <div className='flex items-center'>
          <img src={icon} className='rounded-full w-[47px] h-[47px] bg-line1 mr-[11px]'/>
          <div className='flex flex-col justify-evenly'>
            <p className='text-[14px] text-font1 font-semibold'>닉네임</p>
            <p className='text-[13px] text-font1'>asdfas@gmail.com</p>
          </div>
          <button className='text-line1 rounded-[6px] border border-line1 ml-auto px-2 py-1 h-fit text-[15px]'>수정</button>
        </div>
      </Layout>
    </div>
  );
};

export default MyPage;
