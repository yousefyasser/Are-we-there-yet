import GeneralSettings from '../../shared/GeneralSettings';
import Greeting from '../../shared/Greeting';
import Slider from '../../shared/Slider';

export default function Profile() {
  return (
    <div className="my-20 mx-7 h-auto flex flex-col gap-10">
      <div className=" flex justify-between">
        <Greeting name="John Doe" />
        <GeneralSettings inputFields={['Mobile Number', 'Years of Experience']} />
      </div>
      <Slider title="Previous Works" />
    </div>
  );
}
