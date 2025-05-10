import laikaLogo from '/laika-labs.svg'

const Welcome = () => {
  return (
    <div className="flex flex-col w-full h-full p-10">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img src={laikaLogo} className="w-32 h-32" alt="Laika Labs logo" />
        <p className="text-3xl font-semibold">Laika</p>
        <p className="pt-2 font-light text-md">All your data is saved locally in you browser!</p>
        <p className="mt-4 text-sm text-gray-600 mb-0">Laika 🐶 is 100% Open Source</p>
        <p className="mt-4 text-sm text-gray-600 mt-0">
          Give us a Star ⭐️ on{' '}
          <a className="underline" href="https://github.com/laika-labs/laika" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default Welcome
