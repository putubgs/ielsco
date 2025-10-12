import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TOEICPage() {
  return (
    <div>
      <Header/>
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-[#294154] px-6">
      <div className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          TOEIC Mock Test
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Coming Soon to the IELS Test Platform 🚧
        </p>

        <a
          href="/test"
          className="inline-block mt-6 bg-[#E56668] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#C04C4E] transition-colors"
        >
          ← Back to Test Selection
        </a>
      </div>
    </main>
  <Footer/>
    </div>
  );
}