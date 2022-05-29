import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser, FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import cookies from 'js-cookie'
import cart from '../../assets/cart.png'

const languages = [
  { code: 'uz', name: 'Uz', country_code: 'uz' },
  { code: 'ru', name: 'Ru', country_code: 'ru' },
]

function Navbar() {
  const currentLangCode = cookies.get('i18next') || 'uz'
  const [isOn, setIsOn] = useState(false)
  const [menu, setMenu] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      setIsOn(false)
    } else {
      document.documentElement.classList.remove('dark')
      setIsOn(true)
    }
  }, [])
  useEffect(() => {
    if (isOn) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }, [isOn])

  const { t } = useTranslation()
  return (
    <>
      <div className="fixed w-screen py-3 xl:py-6 z-40 bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <div className="container px-4 mx-auto flex align-center justify-between">
          <div
            className={` lg:hidden bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center flex-col gap-1 nav-toggle ${
              menu && 'active'
            }`}
            onClick={() => setMenu((prevState) => !prevState)}
          >
            <span></span>
            <span></span>
          </div>
          <Link
            to="/"
            onClick={() => menu && setMenu(!menu)}
            className="font-bold text-2xl md:text-4xl flex items-center gap-2"
          >
            <img src={cart} alt="cart" className="w-[40px] md:w-[50px]" />
            Sevimli
          </Link>
          <div
            className={`hidden bg-gray-300 w-12 h-12 rounded-full lg:flex items-center justify-center flex-col gap-1 nav-toggle ${
              menu && 'active'
            }`}
            onClick={() => setMenu((prevState) => !prevState)}
          >
            <span></span>
            <span></span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div
              className="switch hidden sm:flex"
              data-ison={isOn}
              onClick={toggleSwitch}
            >
              <motion.div className="handle" layout transition={spring} />
            </div>
            <div className="flex items-center justify-center gap-2">
              {languages.map(({ code, name, country_code }) => (
                <div key={country_code}>
                  <button
                    onClick={() => i18next.changeLanguage(code)}
                    className={`${
                      code === currentLangCode &&
                      'font-bold text-white dark:text-red-700 bg-gray-900 dark:bg-white p-1 sm:p-2 rounded'
                    }`}
                  >
                    {name}
                  </button>
                </div>
              ))}
            </div>
            <Link
              to="/profile"
              onClick={() => menu && setMenu(!menu)}
              className="hidden sm:block"
            >
              <FaRegUser size={22} />
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="opacity-0 overflow-auto fixed h-screen w-screen pt-32 top-0 left-0 z-30 bg-white dark:bg-slate-900 capitalize font-medium"
          >
            <div className="container px-4 mx-auto flex items-center justify-center">
              <AnimatePresence>
                {showCategory ? (
                  <motion.div
                    initial={{ transform: 'translateX(0px)' }}
                    animate={{ transform: 'translateX(-100px)' }}
                    exit={{ transform: 'translateX(0px)' }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className="switch flex sm:hidden"
                      data-ison={isOn}
                      onClick={toggleSwitch}
                    >
                      <motion.div
                        className="handle"
                        layout
                        transition={spring}
                      />
                    </div>
                    <Link
                      to="/"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('home')}
                    </Link>
                    <div
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700 flex items-center gap-2 sm:relative cursor-pointer"
                      onClick={() => setShowCategory((prevState) => !prevState)}
                    >
                      {t('categories')} <FaChevronRight size={18} />
                      <AnimatePresence>
                        {showCategory && (
                          <motion.div
                            initial={{
                              transform: 'scaleX(0)',
                              opacity: 0,
                            }}
                            animate={{ transform: 'scaleX(1)', opacity: 1 }}
                            exit={{ transform: 'scaleX(0)', opacity: 0 }}
                            className={`cursor-default origin-left bg-white dark:bg-slate-900 absolute top-0 -left-1/5 w-screen sm:w-64 sm:left-[255px] overflow-y-auto text-slate-700 dark:text-white flex flex-col items-center justify-center`}
                          >
                            <div
                              className={`flex items-center justify-center absolute top-0 left-0 bg-white dark:bg-slate-900 w-full h-full z-[-1] sm:hidden `}
                              onClick={() =>
                                setShowCategory(() => !showCategory)
                              }
                            ></div>
                            <div
                              className={`flex items-center justify-center absolute top-0 left-5 bg-gray-300 dark:text-black rounded-full w-12 h-12 z-[-1] sm:hidden `}
                            >
                              <FaChevronLeft />
                            </div>
                            <Link
                              to="/category/breakfast"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('for-breakfast')}
                            </Link>
                            <Link
                              to="/category/lunch"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('for-lunch')}
                            </Link>
                            <Link
                              to="/category/table"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('for-table')}
                            </Link>

                            <Link
                              to="/category/home"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('for-home')}
                            </Link>
                            <Link
                              to="/category/kitchen"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('for-kitchen')}
                            </Link>
                            <Link
                              to="/category/gift"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('gift')}
                            </Link>
                            <Link
                              to="/category/personal"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('personal-hygiene')}
                            </Link>
                            <Link
                              to="/category/appliances"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('home-appliances')}
                            </Link>
                            <Link
                              to="/category/toys"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('toys')}
                            </Link>
                            <Link
                              to="/category/sport"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('sport')}
                            </Link>
                            <Link
                              to="/category/casual"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('casual')}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Link
                      to="/blog"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('blog')}
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('about')}
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('contact')}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMenu(!menu)}
                      className="sm:hidden text-xl md:text-2xl bg-red-700 text-white w-full p-2 text-center rounded-3xl"
                    >
                      Profil
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ transform: 'translateX(0px)' }}
                    className="flex flex-col items-center justify-center"
                  >
                    <Link
                      to="/"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('home')}
                    </Link>
                    <div
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700 flex items-center gap-2 relative cursor-pointer"
                      onClick={() => setShowCategory((prevState) => !prevState)}
                    >
                      {t('categories')} <FaChevronRight size={18} />
                      <AnimatePresence>
                        {showCategory && (
                          <motion.div
                            initial={{ transform: 'scaleX(0)' }}
                            animate={{ transform: 'scaleX(1)' }}
                            exit={{ transform: 'scaleX(0)' }}
                            transition={{ duration: 0.4 }}
                            className={`cursor-default origin-left absolute top-0 lg:w-64 left-[255px] overflow-hidden text-slate-700 flex flex-col items-center justify-center`}
                          >
                            <Link
                              to="/"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('home')}
                            </Link>
                            <Link
                              to="/"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('home')}
                            </Link>
                            <Link
                              to="/"
                              onClick={() => setMenu(!menu)}
                              className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                            >
                              {t('home')}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Link
                      to="/blog"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('blog')}
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('about')}
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMenu(!menu)}
                      className="text-xl md:text-2xl mb-6 hover:text-red-700 active:text-red-700"
                    >
                      {t('contact')}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMenu(!menu)}
                      className="sm:hidden text-xl md:text-2xl bg-red-700 text-white w-full p-2 text-center rounded-3xl"
                    >
                      Profil
                    </Link>
                    <div
                      className="switch mt-4 flex sm:hidden"
                      data-ison={isOn}
                      onClick={toggleSwitch}
                    >
                      <motion.div
                        className="handle"
                        layout
                        transition={spring}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export default Navbar
