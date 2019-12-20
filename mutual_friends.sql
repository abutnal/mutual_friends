-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2019 at 09:21 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mutual_friends`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends_tbl`
--

CREATE TABLE `friends_tbl` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `created_atr` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends_tbl`
--

INSERT INTO `friends_tbl` (`id`, `user_id`, `friend_id`, `created_atr`) VALUES
(10, 71, 73, '2019-12-20 20:13:13'),
(11, 71, 74, '2019-12-20 20:13:15'),
(12, 72, 73, '2019-12-20 20:13:43');

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `user_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `name`, `phone`, `email`, `password`, `created_at`) VALUES
(71, 'Arjun', '8722222996', 'utnal.ab@gmail.com', '12345', '2019-12-04 09:55:04'),
(72, 'Jyoti', '1234567890', 'jyo@gmail.com', '12345', '2019-12-20 16:18:26'),
(73, 'Rashmi', '1234567890', 'rashmi@gmail.com', '12345', '2019-12-20 17:13:30'),
(74, 'Anand', '1234567890', 'anand@gmail.com', '12345', '2019-12-20 17:48:22'),
(75, 'Pragati', '1234567890', 'pra@gmail.com', '12345', '2019-12-20 18:51:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends_tbl`
--
ALTER TABLE `friends_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends_tbl`
--
ALTER TABLE `friends_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
